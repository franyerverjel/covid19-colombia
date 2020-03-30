import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import Loading from './Loading';

const AccumulatedCases = ({ insData }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const positiveList = {};
    const recoveredList = {};
    const deadList = {};

    insData.map((d) => {
      const date = moment(d.date, 'DD/MM/YYYY').format('DD/MM');
      positiveList[date] = positiveList[date] ? positiveList[date] + 1 : 1;

      if (d.status === 'Recuperado') {
        recoveredList[date] = recoveredList[date] ? recoveredList[date] + 1 : 1;
      } else {
        recoveredList[date] = recoveredList[date] ? recoveredList[date] : 0;
      }

      if (d.status === 'Fallecido') {
        deadList[date] = deadList[date] ? deadList[date] + 1 : 1;
      } else {
        deadList[date] = deadList[date] ? deadList[date] : 0;
      }

      return d;
    });

    const labels = Object.keys(positiveList);
    const positiveValues = Object.values(positiveList);
    const recoveredValues = Object.values(recoveredList);
    const deadValues = Object.values(deadList);

    const positiveValuesSum = [];
    const recoveredValuesSum = [];
    const deadValuesSum = [];
    let positiveTotal = 0;
    let recoveredTotal = 0;
    let deadTotal = 0;

    for (let index = 0; index < labels.length; index++) {
      positiveTotal += positiveValues[index];
      positiveValuesSum.push(positiveTotal);

      recoveredTotal += recoveredValues[index];
      recoveredValuesSum.push(recoveredTotal);

      deadTotal += deadValues[index];
      deadValuesSum.push(deadTotal);
    }

    const config = {
      labels,
      datasets: [
        {
          label: 'Casos positivos',
          data: positiveValuesSum,
          borderColor: ['rgb(255, 170, 0)'],
          borderWidth: 2,
          pointBackgroundColor: 'rgb(255, 170, 0)',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: false
        },
        {
          label: 'Recuperados',
          data: recoveredValuesSum,
          borderColor: ['rgb(112, 168, 0)'],
          borderWidth: 2,
          pointBackgroundColor: 'rgb(112, 168, 0)',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: false
        },
        {
          label: 'Fallecidos',
          data: deadValuesSum,
          borderColor: ['rgb(230, 0, 0)'],
          borderWidth: 2,
          pointBackgroundColor: 'rgb(230, 0, 0)',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: false
        }
      ]
    };

    setData(config);
    setLoading(false);
  }, []);

  const options = {
    responsive: true,
    title: {
      display: false,
      text: 'Casos positivos por día'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            color: '#353535',
            zeroLineColor: '#353535',
            borderDash: [4, 2]
          },
          scaleLabel: {
            display: true,
            labelString: 'Fechas',
            fontColor: '#9e9e9e'
          },
          ticks: {
            fontColor: '#9e9e9e'
          }
        }
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            color: '#353535',
            zeroLineColor: '#353535',
            borderDash: [4, 2]
          },
          scaleLabel: {
            display: true,
            labelString: 'Número de casos',
            fontColor: '#9e9e9e'
          },
          ticks: {
            fontColor: '#9e9e9e'
          }
        }
      ]
    }
  };

  return (
    <section className='container section-md'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>Casos acumulados</h2>
          <Line data={data} options={options} />
        </>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  insData: state.website.insData
});

export default connect(mapStateToProps, null)(AccumulatedCases);
