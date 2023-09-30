import React, { useState, useEffect } from 'react';

// Style imports
import axios from 'axios';
import './RepoFinder.scss';

// Package imports

// Container imports
import GridRepos from '../../components/GridRepos/GridRepos';

// UI imports
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const RepoFinder = (props) => {
  const [url, setUrl] = useState('');
  const [inputs, setInputs] = useState({
    language: {
      label: 'Languag',
      elementType: 'select',
      value: '',
      elementConfig: {
        options: [
          { value: 'javascript', displayValue: 'Javascript' },
          { value: 'java', displayValue: 'Java' },
          { value: 'python', displayValue: 'Python' },
        ],
      },
    },
    monthCreatedFrom: {
      label: 'From month',
      elementType: 'select',
      value: '',
      elementConfig: {
        options: [
          { value: '01', displayValue: 'January' },
          { value: '02', displayValue: 'February' },
          { value: '03', displayValue: 'March' },
          { value: '04', displayValue: 'April' },
          { value: '05', displayValue: 'May' },
          { value: '06', displayValue: 'June' },
          { value: '07', displayValue: 'July' },
          { value: '08', displayValue: 'August' },
          { value: '09', displayValue: 'September' },
          { value: '10', displayValue: 'October' },
          { value: '11', displayValue: 'November' },
          { value: '12', displayValue: 'December' },
        ],
      },
    },
    yearCreatedFrom: {
      label: 'From year',
      elementType: 'select',
      value: '',
      elementConfig: {
        options: [
          { value: '2007', displayValue: '2007' },
          { value: '2008', displayValue: '2008' },
          { value: '2009', displayValue: '2009' },
          { value: '2010', displayValue: '2010' },
          { value: '2011', displayValue: '2011' },
          { value: '2012', displayValue: '2012' },
          { value: '2013', displayValue: '2013' },
          { value: '2014', displayValue: '2014' },
          { value: '2015', displayValue: '2015' },
          { value: '2016', displayValue: '2016' },
          { value: '2017', displayValue: '2017' },
          { value: '2018', displayValue: '2018' },
          { value: '2019', displayValue: '2019' },
        ],
      },
    },
    monthCreatedTo: {
      label: 'To month',
      elementType: 'select',
      value: '',
      elementConfig: {
        options: [
          { value: '01', displayValue: 'January' },
          { value: '02', displayValue: 'February' },
          { value: '03', displayValue: 'March' },
          { value: '04', displayValue: 'April' },
          { value: '05', displayValue: 'May' },
          { value: '06', displayValue: 'June' },
          { value: '07', displayValue: 'July' },
          { value: '08', displayValue: 'August' },
          { value: '09', displayValue: 'September' },
          { value: '10', displayValue: 'October' },
          { value: '11', displayValue: 'November' },
          { value: '12', displayValue: 'December' },
        ],
      },
    },
    yearCreatedTo: {
      label: 'To year',
      elementType: 'select',
      value: '',
      elementConfig: {
        options: [
          { value: '2007', displayValue: '2007' },
          { value: '2008', displayValue: '2008' },
          { value: '2009', displayValue: '2009' },
          { value: '2010', displayValue: '2010' },
          { value: '2011', displayValue: '2011' },
          { value: '2012', displayValue: '2012' },
          { value: '2013', displayValue: '2013' },
          { value: '2014', displayValue: '2014' },
          { value: '2015', displayValue: '2015' },
          { value: '2016', displayValue: '2016' },
          { value: '2017', displayValue: '2017' },
          { value: '2018', displayValue: '2018' },
          { value: '2019', displayValue: '2019' },
        ],
      },
    },
    starsFrom: {
      label: 'Min # of stars',
      elementType: 'number',
      value: '',
      elementConfig: {
        options: [],
      },
    },
    startsTo: {
      label: 'Max # of stars',
      elementType: 'number',
      value: '',
      elementConfig: {
        options: [],
      },
    },
  });
  const [repos, setRepos] = useState('');
  useEffect(() => {
    if (url) {
      axios
        .get(url)
        .then((res) => {
          const reposarr = res.data.items.map((el) => {
            const date = el.updated_at.split('t');
            return {
              id: el.id,
              name: el.full_name,
              updated_at: date[0],
              stars: el.stargazers_count,
              img: el.owner.avatar_url,
              url: el.html_url,
            };
          });
          setRepos(reposarr);
        })
        .catch((err) => console.log(err));
    }
  }, [url]);
  const onChangeHandler = (event, id) => {
    // Copy 1st level
    const updatedInputs = {
      ...inputs,
    };
    // Copy 2nd level
    const updatedInputElement = {
      ...updatedInputs[id],
    };
    // Update the copy of 2nd level
    updatedInputElement.value = event.target.value;
    // Update the copy of 1st level
    updatedInputs[id] = updatedInputElement;
    // Update state with the indirectly with the copied state
    setInputs(updatedInputs);
  };

  // Transform the state into an iterable array for render
  const formElementsArr = [];
  for (const el in inputs) {
    formElementsArr.push({
      id: el,
      config: inputs[el],
    });
  }

  const formHandler = (event) => {
    event.preventDefault();
    console.log(formElementsArr);

    // Start building the query string for api search
    // base url
    const baseUrl =
      'https://api.github.com/search/repositories?q=good-first-issues:>0';
    const language = `topic:${formElementsArr[0].config.value}`;
    const stars = `stars:${formElementsArr[5].config.value}..${formElementsArr[6].config.value}`;
    const created = `created:${formElementsArr[2].config.value}-${formElementsArr[1].config.value}-01..${formElementsArr[4].config.value}-${formElementsArr[3].config.value}-01`;

    const URL = `${baseUrl}+${language}+${stars}+${created}`;
    setUrl(URL);
    console.log(URL);
  };

  const form = (
    <form onSubmit={formHandler}>
      {formElementsArr.map((el) => (
        <Input
          key={el.id}
          elementType={el.config.elementType}
          value={el.config.value}
          changed={(event) => onChangeHandler(event, el.id)}
          elementConfig={el.config.elementConfig}
          label={el.config.label}
        />
      ))}
      <Button disabled={false} label="Get repos" />
    </form>
  );

  return (
    <div className="RepoFinder">
      {form}
      <GridRepos repos={repos} />
    </div>
  );
};

export default RepoFinder;
