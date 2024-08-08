import * as React from "react";
import * as pnp from "sp-pnp-js";
import  './Table.module.scss';

type Props = {};

type DataProps ={
    Title: string;
    TypeProduct: string;
    Product: string;
    Comment: string;
    Status: string;
  };

const Table = (props: Props) => {
  const [data, setData] = React.useState<DataProps[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pnp.sp.web.lists
          .getByTitle("Ticket")
          .items
          .get();
        setData(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching columns: ", error);
      }
    };
    fetchData();
  }, []);
  return (
<div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>TypeProduct</th>
            <th>Product</th>
            <th>Comment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Title}</td>
              <td>{item.TypeProduct}</td>
              <td>{item.Product}</td>
              <td>{item.Comment}</td>
              <td>{item.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
