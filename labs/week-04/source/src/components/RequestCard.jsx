const priorityLabels = {
  normal: 'ปกติ',
  urgent: 'เร่งด่วน',
};

const statusLabels = {
  pending: 'รอดำเนินการ',
  progress: 'กำดำเนินการ',
  completed: 'เสร็จแล้ว',
};

function RequestCard({ request, onDeleteRequest }) {
  return (
    <article className="request-card">
      <div>
        <div className="badge-row">
          <span className={`badge status-${request.status}`}>
            {statusLabels[request.status]}
          </span>
        </div>
        <p className="request-id">{request.id}</p>
        <h3>{request.requestType}</h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <div className="badge-row">
          <span className={`badge priority-${request.priority}`}>
            {priorityLabels[request.priority]}
          </span>
        </div>
      </div>
      <button type="button" onClick={() => onDeleteRequest(request.id)}>ลบ</button>
    </article>
  );
}

export default RequestCard;

