import { Table } from 'antd'
import { useAppSelector } from "../hooks";

const columns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "title",
    },
    {
      title: "Venue",
      dataIndex: "Venue",
      key: "venue",
    },
    {
      title: "Year",
      dataIndex: "Year",
      key: "year",
    },
    {
      title: "Authors",
      key: "authors",
      dataIndex: "Authors",
    },
  ];

function Papers(): JSX.Element {

    const { papers, filters } = useAppSelector((state) => state);

    const filteredPapers = papers.filter((paper) => {
      return paper
    })
    console.log()

    const papersData = filteredPapers.map((paper) => ({
      ...paper,
      key: papers.indexOf(paper),
      Authors: paper.Authors[0] + " et al.",
    }));

    return (
        <Table
            style={{ marginTop: 10 }}
            columns={columns}
            dataSource={papersData}
            expandable={{
              expandedRowRender: (record) => (
                <a href={record.url} style={{ margin: 0 }}>
                  {record.url}
                </a>
              ),
            }}
          ></Table>
    )
}

export default Papers