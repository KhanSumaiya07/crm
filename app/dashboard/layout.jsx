// app/dashboard/layout.jsx
import Navbar from '../components/layout/navbar/navbar';
import Sidebar from '../components/layout/sidebar/sidebar';

export const metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '1rem', paddingTop:'6rem' }}>{children}</main>
      </div>
    </div>
  );
}
