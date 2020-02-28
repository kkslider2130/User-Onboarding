import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Button, FormGroup, Label } from "reactstrap";

function SignupForm(props) {
  const [data, setData] = useState([]);
  /*   const [userArray] = useState([]);
   */ /*   let isObjectEmpty = !Object.keys(data).length;
   */ console.log(props);
  useEffect(() => {
    props.status && setData(data => [...data, props.status]);
    /*     userArray.push(props.status);
     */
  }, [props.status]);
  /* useEffect(() => {
    !isObjectEmpty && userArray.push(data);
  }, [data]); */
  return (
    <div className="main-form">
      <Form>
        <FormGroup>
          <Label>
            Name
            <Field
              type="text"
              name="username"
              placeholder="desired username"
              className="form-control"
            />
            {props.errors.username && props.touched.username && (
              <p className="feedback">{props.errors.username}</p>
            )}
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            Password
            <Field
              type="text"
              name="password"
              placeholder="password"
              className="form-control"
            />
            {props.errors.password && props.touched.password && (
              <p className="feedback">{props.errors.password}</p>
            )}
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            Confirm Password
            <Field
              type="password"
              name="passwordCorfirmation"
              placeholder="confirm password"
              securetextentry="true"
              className="form-control"
            />
            {props.errors.passwordCorfirmation &&
              props.touched.passwordCorfirmation && (
                <p className="feedback">{props.errors.passwordCorfirmation}</p>
              )}
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            Email
            <Field
              type="text"
              name="email"
              placeholder="Email Address"
              className="form-control"
            />
            {props.errors.email && props.touched.email && (
              <p className="feedback">{props.errors.email}</p>
            )}
          </Label>
        </FormGroup>
        <FormGroup check>
          <label className="form-check-label">
            <Field type="checkbox" name="terms" className="form-check-input" />I
            agree to surrender my soul to the maker of this app
            {props.touched.terms && (
              <p className="feedback">{props.errors.terms}</p>
            )}
          </label>
        </FormGroup>

        <Button type="submit">Submit</Button>
      </Form>

      {data.map(a => {
        return (
          <ul key={a.id}>
            <h3>ID: {a.id}</h3>
            <li>user name: {a.username}</li>
            <li>email: {a.email}</li>
            <li>password: {a.password}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default withFormik({
  mapPropsToValues: () => ({
    username: "",
    password: "",
    passwordCorfirmation: "",
    email: "",
    terms: false
  }),
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .required("user name is required")
      .max(14, "way too long")
      .min(4, "must be at least 5 characters"),
    password: yup
      .string()
      .required("please enter a password")
      .min(8, "mininum of 8 characters required"),
    passwordCorfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("confirmation required"),
    email: yup
      .string()
      .email("email must be valid")
      .required("must enter email"),
    terms: yup
      .boolean()
      .oneOf([true], "please agree to the terms of service")
      .required()
  }),

  handleSubmit: (values, formikBag) => {
    console.log("submitting...", formikBag);

    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log(res);
        formikBag.setStatus(res.data);
        formikBag.resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(SignupForm);
