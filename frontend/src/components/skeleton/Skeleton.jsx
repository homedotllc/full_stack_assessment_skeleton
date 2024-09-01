import React from 'react';
import './Skeleton.css';

const SkeletonLoader = () => (
  <div className="skeleton-container">
    <div className="skeleton-card"></div>
    <div className="skeleton-card"></div>
    <div className="skeleton-card"></div>
    <div className="skeleton-card"></div>
  </div>
);

export default React.memo(SkeletonLoader);
