import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Totales = ({ insData }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    let obj = {
      total: insData.length
    };
    const recovereds = insData.filter((d) => d.status === 'Recuperado');
    const deads = insData.filter((d) => d.status === 'Fallecido');

    obj = { ...obj, recovereds: recovereds.length, deads: deads.length };

    setData(obj);
  }, []);

  return (
    <section className='section-totales'>
      <div className='container'>
        <div className='item'>
          <h3 className='text-yellow'>{data.total}</h3>
          <h4>Casos confirmados</h4>
        </div>
        <div className='item'>
          <h3 className='text-green'>{data.recovereds}</h3>
          <h4>Recuperados</h4>
        </div>
        <div className='item'>
          <h3 className='text-red'>{data.deads}</h3>
          <h4>Fallecidos</h4>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  insData: state.website.insData
});

export default connect(mapStateToProps, null)(Totales);
