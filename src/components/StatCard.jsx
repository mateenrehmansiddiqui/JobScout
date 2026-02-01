import './StatCard.css';

const StatCard = ({ label, value, icon, trend }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <h3 className="stat-value">{value}</h3>
        {trend && <span className="stat-trend">{trend}</span>}
      </div>
    </div>
  );
};

export default StatCard;