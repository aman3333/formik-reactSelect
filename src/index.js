import './formik-demo.css';
import React from 'react';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import './formik-demo.css';
import { MoreResources, DisplayFormikState } from './formik-helper';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
      gender:Yup.string().required(),

      mobile:Yup.number().min(6000000000,"invalid mobile number").max(9999999999,"invalid mobile number")
      .required('mobile number is required'),
      year:Yup.number().required(),
      day:Yup.number().required(),
      month:Yup.number().required(),
    languages: Yup.array()
      .min(1, 'Pick at least 1 language')
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
  }),
  mapPropsToValues: props => ({
    email: '',
    languages: [],
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      languages: values.languages.map(t => t.value),
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm',
});

const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ display: 'block' }}>
        Email
      </label>
      <input
        id="email"
        placeholder="Enter your email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email &&
        touched.email && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.email}</div>
        )}
        <label htmlFor="email" style={{ display: 'block' }}>
        Mobile
        </label>
        <input
          id="mobile"
          placeholder="Enter your mobile"
           type="number"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      {(errors.mobile ||
          touched.mobile) && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.mobile}</div>
          )}
          <label htmlFor="Gender" style={{ display: 'block' }}>
            Gender
          </label>

          <div style={{width:'300px'}}>

                              <input  type="radio" onChange={handleChange}  name="gender" value="male" /> Male<br/>
              <input  type="radio" name="gender" onChange={handleChange} value="female" /> Female<br/>
          </div>
              <br/>
      <MySelect
        value={values.languages}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        error={errors.languages}
            multi={true}
        touched={touched.languages}
      />

    <div style={{display:'inline'}}>
        <label htmlFor="color">Date of birth </label>
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="color">Year </label>
        <Select
          id="color"
          options={[{value:1990,label:'1990'},{value:1991,label:'1991'}]}
          multi={false}
          onChange={(sd)=>setFieldValue('year',sd.value)}

          value={values.year}
        />
      {errors.year &&
        touched.year && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.year}</div>
          )}
      </div>

      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="color">Month </label>
        <Select
          id="color"
          options={[{value:1,label:'January'},{value:2,label:'February'}]}
          multi={false}
          onChange={(sd)=>setFieldValue('month',sd.value)}
           disabled={!values.year&&true}
          value={values.month}
        />
      {errors.month &&
        touched.month && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.month}</div>
          )}
      </div>

      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="color">Day </label>
        <Select
          id="color"
          options={[{value:1,label:'1'},{value:2,label:'2'}]}
          multi={false}
          onChange={(sd)=>setFieldValue('day',sd.value)}
 disabled={values.year>0&&values.month>0?false:true}
          value={values.day}
        />
      {errors.day &&
        touched.day && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.day}</div>
          )}
      </div>
    </div>
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>

      <DisplayFormikState {...props} />
    </form>
  );
};

const options = [
  { value: 'Hindi', label: 'Hindi' },
  { value: 'English', label: 'English' },

];

class MySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange('languages', value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur('languages', true);
  };

  render() {
    return (
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="color">languages (select at least 1) </label>
        <Select
          id="color"
          options={options}
          multi={this.props.multi}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error &&
          this.props.touched && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
          )}
      </div>
    );
  }
}

const MyEnhancedForm = formikEnhancer(MyForm);

// Helper styles for demo


const App = () => (
  <div className="app">

    <p>
      This example shows to use Formik
    </p>

    <MyEnhancedForm />
    <MoreResources />
  </div>
);

render(<App />, document.getElementById('root'));
