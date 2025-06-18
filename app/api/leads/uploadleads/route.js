import { connectDB } from '../../../../lib/db';
import Lead from '../../../../models/Lead';
import { Readable } from 'stream';
import csv from 'csv-parser';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file)
    return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });

  await connectDB();

  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = Readable.from(buffer);
  const results = [];

  return new Promise((resolve, reject) => {
    stream
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', async () => {
        let successCount = 0;
        let skippedCount = 0;

        for (const row of results) {
          try {
            // Skip row if required fields are missing
            if (!row.fullname || !row.email || !row.phone) {
              console.warn('Skipping incomplete row:', row);
              skippedCount++;
              continue;
            }

            const lead = {
              fullname: row.fullname.trim(),
              email: row.email.trim(),
              phone: row.phone.trim(),
              DOB: row.DOB ? new Date(row.DOB) : undefined,
              gender: row.gender,
              countryofresidence: row.countryofresidence,
              preferencecountry: row.preferencecountry,
              prefferredcourse: row.prefferredcourse,
              intake: row.intake,
              percentage: row.percentage,
              qualification: row.qualification,
              score: row.score,
              budget: row.budget,
              passOutyear: row.passOutyear,
              
              followUps: [],
            };

            // Optional follow-up
            if (row['followUp1.date'] || row['followUp1.remark']) {
              lead.followUps.push({
                leadType: row['followUp1.leadType'] || '',
                date: row['followUp1.date']
                  ? new Date(row['followUp1.date'])
                  : undefined,
                time: row['followUp1.time'] || '',
                mode: row['followUp1.mode'] || '',
                status: row['followUp1.status'] || 'New',
                remark: row['followUp1.remark'] || '',
              });
            }

            await Lead.create(lead);
            successCount++;
          } catch (err) {
            console.error('Error creating lead:', err.message);
          }
        }

        resolve(
          NextResponse.json(
            {
              message: `${successCount} leads imported successfully. ${skippedCount} rows skipped due to missing data.`,
            },
            { status: 200 }
          )
        );
      })
      .on('error', (error) => {
        reject(
          NextResponse.json(
            { message: 'CSV parse error', error: error.message },
            { status: 500 }
          )
        );
      });
  });
}
