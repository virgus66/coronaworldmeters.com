import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import logo from '../logo.svg';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable({list}) {

  const classes = useStyles();
  const [countries, setCountries] = useState([])
  useEffect( ()=> {
    setCountries(list)
  }, [list])

  return list.length > 0 ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Country name</TableCell>
            <TableCell align="right">Cases</TableCell>
            <TableCell align="right">Active Cases</TableCell>
            <TableCell align="right">Deaths</TableCell>
            <TableCell align="right">deaths_per_1m_population</TableCell>
            <TableCell align="right">new_cases</TableCell>
            <TableCell align="right">new_deaths</TableCell>
            <TableCell align="right">region</TableCell>
            <TableCell align="right">serious_critical</TableCell>
            <TableCell align="right">tests_per_1m_population</TableCell>
            <TableCell align="right">total_cases_per_1m_population</TableCell>
            <TableCell align="right">Total Recovered</TableCell>
            <TableCell align="right">total_tests</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((row) => (
          <>
            <TableRow key={row.country_name}>
              <TableCell component="th" scope="row">{row.country_name}</TableCell>
              <TableCell align="right">{row.cases}</TableCell>
              <TableCell align="right">{row.active_cases}</TableCell>
              <TableCell align="right">{row.deaths}</TableCell>
              <TableCell align="right">{row.deaths_per_1m_population}</TableCell>
              <TableCell align="right">{row.new_cases}</TableCell>
              <TableCell align="right">{row.new_deaths}</TableCell>
              <TableCell align="right">{row.region}</TableCell>
              <TableCell align="right">{row.serious_critical}</TableCell>
              <TableCell align="right">{row.tests_per_1m_population}</TableCell>
              <TableCell align="right">{row.total_cases_per_1m_population}</TableCell>
              <TableCell align="right">{row.total_recovered}</TableCell>
              <TableCell align="right">{row.total_tests}</TableCell>

            </TableRow>
          </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  ) : ( <img src={logo} className="App-logo" alt="logo" />);
}