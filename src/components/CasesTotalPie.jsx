import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

import Loading from './Loading';

const CasesTotalPie = ({ insData }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    let positiveTotal = 0;
    let recoveredTotal = 0;
    let deadTotal = 0;
    let activeTotal = 0;

    insData.map((d) => {
      if (d.status === 'Recuperado') {
        recoveredTotal += 1;
      } else if (d.status === 'Fallecido') {
        deadTotal += 1;
      } else {
        positiveTotal += 1;
      }

      return d;
    });

    activeTotal = positiveTotal - recoveredTotal - deadTotal;

    const labels = ['Casos activos', 'Recuperados', 'Fallecidos'];

    const config = {
      labels,
      datasets: [
        {
          data: [activeTotal, recoveredTotal, deadTotal],
          backgroundColor: [
            'rgb(255, 170, 0)',
            'rgb(112, 168, 0)',
            'rgb(230, 0, 0)'
          ],
          borderColor: 'transparent'
        }
      ]
    };

    setData(config);
    setLoading(false);
  }, []);

  return (
    <section className='container section-md'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>Resumen de casos</h2>
          <div className='pie-width'>
            <Doughnut data={data} />
          </div>
        </>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  insData: state.website.insData
});

export default connect(mapStateToProps, null)(CasesTotalPie);
