import React, { useEffect, useState } from 'react';
import tips from './tips.csv';
import sampleData from './SampleDataset.csv';
import { NumericalData, CategoricalData, getData } from './lib/getData';
import { ComboBox } from './components/ui/combobox';
import * as d3 from 'd3';
import { BarChart } from './components/ui/barchart/barchart';
import { ScatterPlot } from './components/ui/scatterplot/scatterplot';

function App() {
  const [numericalData, setNumericalData] = useState<{
    data: NumericalData;
    columns: string[];
  } | null>(null);
  const [categoricalData, setCategoricalData] = useState<{
    data: CategoricalData;
    columns: string[];
  } | null>(null);
  const [originalData, setOriginalData] = useState<
    [d3.DSVRowArray<string>] | null
  >(null);
  const [selectedValue, setSelectedValue] = useState('A');

  useEffect(() => {
    const fetchData = async () => {
      const dataObj = await getData(sampleData);
      setNumericalData({
        data: dataObj.numerical_data,
        columns: dataObj.numerical_cols,
      });
      setCategoricalData({
        data: dataObj.categorical_data,
        columns: dataObj.categorical_cols,
      });
      setOriginalData([dataObj?.data]);
    };
    fetchData();
  }, []);

  const labelVals = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
  ];

  return (
    <div className="p-2 h-screen">
      <div className="flex flex-col justify-center w-full items-center gap-2">
        <div className="border-2 border-[#E0E0E0] h-[400px] w-[800px] flex items-center justify-center rounded-md">
          <BarChart
            numerical_data={numericalData?.data ?? []}
            categorical_data={categoricalData?.data ?? []}
            catSelectedValue={'category'}
            innerBarPad={0.3}
            outterBarPad={0.3}
            withAxis={true}
          />
        </div>
        <div>
          <ComboBox
            items={labelVals}
            defaultValue="A"
            onValueChange={setSelectedValue}
          />
        </div>
        <div className="my-16">
          <ScatterPlot
            data={numericalData?.data ?? []}
            x_col="x"
            y_col="y"
            xTickCountIdx={2}
            xTickSize={5}
            yTickSize={5}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
