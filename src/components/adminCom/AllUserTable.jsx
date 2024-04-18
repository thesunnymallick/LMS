import { Table } from 'antd'
import React from 'react'

const AllUserTable = ({info, columns}) => {
    const paginationOptions = {
        pageSize: 5, // Number of items per page
        // You can customize further pagination options here if needed
      };
  return (
    <div>
     <Table dataSource={info} columns={columns} pagination={paginationOptions} />;
    </div>
  )
}

export default AllUserTable
