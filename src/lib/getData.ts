import * as d3 from 'd3';

export type NumericalData = { [key: string]: number | string[] }[];
export type CategoricalData = { [key: string]: string | string[] }[];

// Helper function to get data from csv and sperate them into numerical and categorical columns
const getData = async (csvPath: string, discardNullValues=true) => { 
  const data = await d3.csv(csvPath).then((data) => {
    return data;
  })
  const columns = data['columns'];
  
  const numerical_cols = [...columns.filter((col) => { 
    return (data.every(row => { 
      const value = parseFloat(row[col]);
      return !isNaN(value) && isFinite(value);
    }))
  })]
  const categorical_cols = columns.filter((col) => { return !numerical_cols.includes(col) }) 

  // formatting the data
  const numerical_data: NumericalData = data.map((obj) => {
    const numerical_obj: { [key: string]: number } = {};
    numerical_cols.forEach((col) => {
      const value = parseFloat(obj[col]);
      if (discardNullValues && (!isNaN(value) && isFinite(value))) {
        numerical_obj[col] = value;
      }
    });
    
    return numerical_obj;
  });

  const categorical_data: CategoricalData = data.map((obj) => {
    const categorical_obj: { [key: string]: string } = {};
    categorical_cols.forEach((col) => {
      const value = obj[col];
      categorical_obj[col] = value;
    });
    return categorical_obj;
  });

  return {data, columns, numerical_data, categorical_data, numerical_cols, categorical_cols}
}

export { getData };