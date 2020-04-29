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
import { red, yellow } from '@material-ui/core/colors';


const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    maxHeight: 800,
  },
  head: {
    maxWidth: 50,
    // overflowWrap: anywhere
    textAlign: 'center',
  },
  cell: {
    textAlign: 'center',
  },
  deaths: {
    backgroundColor: red['600'],
    color: 'white',
  },
  newCases: {
    backgroundColor: yellow['600'],
  }
});

let handleClick = e => {
  let t = e.currentTarget.querySelector('th').textContent.toLowerCase()

  alert( 'I\'m working on ' + t + ' currently')
}

export default function SimpleTable({list}) {

  const classes = useStyles();

  return list.length > 0 ? (
    <TableContainer className={classes.table} component={Paper}>
      <Table size="small" aria-label="a dense table" 
            stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.head}>Country name</TableCell>
            <TableCell className={classes.head}>Total Cases</TableCell>
            <TableCell className={classes.head}>Active Cases</TableCell>
            <TableCell className={classes.head}>Deaths</TableCell>
            <TableCell className={classes.head}>deaths / 1M</TableCell>
            <TableCell className={classes.head}>new cases</TableCell>
            <TableCell className={classes.head}>new deaths</TableCell>
            {/* <TableCell className={classes.head}>region</TableCell> */}
            <TableCell className={classes.head}>serious critical</TableCell>
            <TableCell className={classes.head}>tests / 1m population</TableCell>
            <TableCell className={classes.head}>total cases / 1m population</TableCell>
            <TableCell className={classes.head}>Total Recovered</TableCell>
            <TableCell className={classes.head}>total tests</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow className="table_row" key={row.country_name} onClick={handleClick}>
              <TableCell component="th" scope="row">{row.country_name}</TableCell>
              <TableCell className={classes.cell}>{row.cases}</TableCell>
              <TableCell className={classes.cell}>{row.active_cases}</TableCell>
              <TableCell className={[classes.cell ,classes.deaths].join(' ')}>{row.deaths}</TableCell>
              <TableCell className={classes.cell}>{row.deaths_per_1m_population}</TableCell>
              <TableCell className={[classes.cell,classes.newCases].join(' ')}>{row.new_cases}</TableCell>
              <TableCell className={classes.cell}>{row.new_deaths}</TableCell>
              {/* <TableCell className={classes.cell}>{row.region}</TableCell> */}
              <TableCell className={classes.cell}>{row.serious_critical}</TableCell>
              <TableCell className={classes.cell}>{row.tests_per_1m_population}</TableCell>
              <TableCell className={classes.cell}>{row.total_cases_per_1m_population}</TableCell>
              <TableCell className={classes.cell}>{row.total_recovered}</TableCell>
              <TableCell className={classes.cell}>{row.total_tests}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  ) : ( <img src={logo} className="App-logo" alt="logo" />);
}