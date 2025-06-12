import React from 'react';
import styles from '../../page.module.css';

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <div className={styles.dashboardHeader}>
      <h1 className={styles.dashboardTitle}>{title}</h1>
      <p className={styles.dashboardSubtitle}>{subtitle}</p>
    </div>
  );
};

export default DashboardHeader;
