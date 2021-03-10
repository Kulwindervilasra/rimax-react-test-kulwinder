import React from "react";
import { Avatar } from "@material-ui/core";
import { useUserProfile } from "../../common/apiHooks";
import { useForm } from "react-hook-form";
import { apiCallPatch } from "../../common/api";

const Profile = () => {
  const profile = useUserProfile();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    await apiCallPatch("/users/2", data, true);
  };

  return (
    <div className="col-4 m-3 mx-auto">
      <div class="col-sm text-center">
        <img className="rounded" alt="Profile Image" src={profile?.avatar} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>First Name</label>
          <input
            className="form-control"
            defaultValue={profile?.first_name}
            name="first_name"
            ref={register({ required: true })}
          />

          {errors?.first_name && (
            <p className="text-danger">First name is required.</p>
          )}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            className="form-control"
            defaultValue={profile?.last_name}
            name="last_name"
            ref={register({ required: true })}
          />
          {errors?.last_name && (
            <p className="text-danger">Last name is required.</p>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            defaultValue={profile?.email}
            name="email"
            ref={register({
              required: true,
              pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="text-danger">Email is required.</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="text-danger">Enter valid email address.</p>
          )}
        </div>
        <div className="form-group text-center">
          <input className="btn btn-primary " type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
