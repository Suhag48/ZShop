import { useContext, useEffect } from "react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import myContext from "../../context/myContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define the validation schema using Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters!")
    .max(10, "Name must not exceed 10 characters!")
    .required("Name is required!"),
  phone: yup
    .string()
    .matches(/^[0-9]{11}$/, "Phone number must be exactly 11 digits!")
    .required("Phone number is required!"),
  address: yup
    .string()
    .min(4, "Address must be at least 4 characters!")
    .required("Address is required!"),
});

const Profile = () => {

  const { userData, loading, error, onSubmit } = useContext(myContext);

  // Use React Hook Form for form validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {}, // Set to an empty object, it will be filled once the user data is found
  });

  useEffect(() => {
    if (userData) {
      // Fill in the form with existing user data if available
      reset({
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
      });
    }
  }, [userData, reset]);

  return (
    <section className="px-6 py-8 h-[500px] flex flex-col items-center">
      <CardTitle className="text-center text-lg">Profile</CardTitle>
      {loading ? (
        <p className="text-center h-full w-full flex items-center justify-center">
          Loading...
        </p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <Card className="flex flex-col gap-4 mt-8 md:mt-10 w-full lg:w-3/4 xl:w-1/2 p-6">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">Name:</h4>
            <p>{userData?.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <h4 className="font-medium">Email:</h4>
            <p>{userData?.email}</p>
          </div>

          <div className="flex items-center gap-2">
            <h4 className="font-medium">Address:</h4>
            <p>{userData?.address}</p>
          </div>

          {/* Edit Button to trigger AlertDialog */}
          <AlertDialog>
            <AlertDialogTrigger className="mt-4">
              <Button variant="outline">Edit</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-2"
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Full name"
                  className="focus-visible:ring-0"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                <Input
                  id="phone"
                  type="text"
                  placeholder="Phone number"
                  className="focus-visible:ring-0"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}

                <Textarea
                  id="address"
                  placeholder="Address"
                  className="focus-visible:ring-0"
                  rows={6}
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction type="submit">Done</AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </Card>
      )}
    </section>
  );
};

export default Profile;
