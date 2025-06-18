import "./data-table.css"

export function DataTable({ columns, data, title, action, emptyState, loading }) {
  return (
    <div className="data-table-container">
      <div className="data-table-header">
        <h3 className="data-table-title">{title}</h3>
        {action}
      </div>
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="data-table-loading">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => {
                    // Get the cell value
                    let value;
                    if (typeof column.accessor === 'function') {
                      value = column.accessor(row);
                    } else {
                      value = row[column.accessor];
                    }
                    
                    // Apply cell formatting if specified
                    return (
                      <td key={colIndex}>
                        {column.cell ? column.cell(value, row) : value}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="data-table-empty">
                  {emptyState || 'No data available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}