import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import setINSData from '../actions/website';
import Loading from '../components/Loading';
import Totales from '../components/Totales';
import CasesPerDay from '../components/CasesPerDay';
import AccumulatedCases from '../components/AccumulatedCases';
import CasesTotalPie from '../components/CasesTotalPie';

const Home = ({ setINSData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl =
      'https://raw.githubusercontent.com/franyerverjel/covid19/master/api/data.json';
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setINSData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Totales />
      <AccumulatedCases />
      <CasesPerDay />
      <CasesTotalPie />
    </>
  );
};

const mapDispatchToProps = {
  setINSData
};

export default connect(null, mapDispatchToProps)(Home);
