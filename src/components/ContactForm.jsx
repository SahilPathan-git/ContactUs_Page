import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, submitForm } from "../Slice/contactFormSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import image from "../Images/image.png";
import "./ContactForm.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.contact);
  const [message, setMessage] = useState("");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    website_url: Yup.string().url("Invalid URL").nullable(),
    project_details: Yup.string()
      .min(20, "Project details must be at least 20 characters")
      .required("Project details are required"),
  });
  // using formik
  const formik = useFormik({
    initialValues: {
      name: form.name,
      email: form.email,
      website_url: form.website_url,
      project_details: form.project_details,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(submitForm(values))
        .unwrap()
        .then(() => {
          setMessage("Form submitted successfully!");
          formik.resetForm();
          dispatch(resetForm());
        })
        .catch((error) => {
          const { message } = error;
          setMessage(message || "An error occurred during submission");
        });
    },
  });

  return (
    <div className="container">
      <div className="diagram">
        <img
          src={image}
          alt="diagram"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div className="form-container">
        <h1>We'd love to hear from you</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name*"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email*"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <input
              id="website_url"
              name="website_url"
              type="url"
              placeholder="Website URL (optional)"
              onChange={formik.handleChange}
              value={formik.values.website_url}
              onBlur={formik.handleBlur}
            />
            {formik.touched.website_url && formik.errors.website_url ? (
              <div>{formik.errors.website_url}</div>
            ) : null}
          </div>
          <div>
            <textarea
              id="project_details"
              name="project_details"
              placeholder="Project Details*"
              rows="12"
              onChange={formik.handleChange}
              value={formik.values.project_details}
              onBlur={formik.handleBlur}
            />
            {formik.touched.project_details && formik.errors.project_details ? (
              <div>{formik.errors.project_details}</div>
            ) : null}
          </div>
          <button type="submit">
            {form.status === "loading" ? "Submitting..." : "Send Proposal"}
          </button>
          {form.status === "failed" && <div>Error: {form.error}</div>}
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ContactForm;
