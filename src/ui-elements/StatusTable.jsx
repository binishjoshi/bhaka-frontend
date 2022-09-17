const StatusTable = ({ headerData, bodyData }) => {
  return (
    <table className='status-table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>{headerData[0]}</th>
          <th scope='col'>{headerData[1]}</th>
        </tr>
      </thead>
      <tbody>
        {bodyData.map((row) => (
          <tr key={bodyData.indexOf(row) + 1}>
            <td>{bodyData.indexOf(row) + 1}</td>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatusTable;
