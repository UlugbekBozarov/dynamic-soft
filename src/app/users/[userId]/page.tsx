"use client";

import {
  ControlledImageUploader,
  ControlledInput,
  ControlledSwitch,
} from "@/components/form";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserQuery,
} from "@/provider/redux/features/users/UsersApi";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import { get } from "lodash";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const FORM_NAMES = {
  avatar: "avatar",
  name: "name",
  phoneNumber: "phoneNumber",
  address: "address",
  status: "status",
};

const UserAddOrEdit = ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const router = useRouter();

  const [starterLoading, setStarterLoading] = useState<boolean>(true);

  const { data: byIdData, isLoading: isByIdLoading } = useGetUserQuery(
    params.userId
  );

  const [editUser, { isLoading, isError }] = useEditUserMutation();

  const [deleteUser, { isLoading: isDeleteLoading, isError: isDeleteError }] =
    useDeleteUserMutation();

  const formStore = useForm({
    defaultValues: {
      [FORM_NAMES.name]: "",
      [FORM_NAMES.phoneNumber]: "",
      [FORM_NAMES.address]: "",
      [FORM_NAMES.avatar]: "",
      [FORM_NAMES.status]: true,
    },
  });

  const { handleSubmit, reset } = formStore;

  const submitHandler = handleSubmit(async (data) => {
    try {
      await editUser({
        id: params?.userId,
        body: {
          [FORM_NAMES.name]: get(data, FORM_NAMES.name, ""),
          [FORM_NAMES.phoneNumber]: get(data, FORM_NAMES.phoneNumber, ""),
          [FORM_NAMES.address]: get(data, FORM_NAMES.address),
          [FORM_NAMES.avatar]: get(data, FORM_NAMES.avatar),
          [FORM_NAMES.status]: get(data, FORM_NAMES.status, false) as boolean,
        },
      });
      router.back();
    } catch (error) {}
  });

  const handleDelete = async () => {
    try {
      if (params?.userId !== "add") {
        await deleteUser(params?.userId);
        console.log("How are you");
        router.back();
      }
    } catch (error) {
      console.log("How are you2222");
    }
  };

  useEffect(() => {
    if (!isByIdLoading) {
      reset({
        [FORM_NAMES.name]: get(byIdData, FORM_NAMES.name, ""),
        [FORM_NAMES.phoneNumber]: get(byIdData, FORM_NAMES.phoneNumber, ""),
        [FORM_NAMES.address]: get(byIdData, FORM_NAMES.address, ""),
        [FORM_NAMES.avatar]: get(byIdData, FORM_NAMES.avatar, ""),
        [FORM_NAMES.status]: get(byIdData, FORM_NAMES.status, ""),
      });
      setStarterLoading(false);
    }
  }, [isByIdLoading]);

  return (
    <FormProvider {...formStore}>
      <form onSubmit={submitHandler}>
        <Box maxWidth="1000px">
          <Card sx={{ padding: "20px" }}>
            {starterLoading ? (
              <Box
                minHeight="200px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <ControlledImageUploader
                    size="large"
                    name={FORM_NAMES.avatar}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledInput
                    labelKey="Name"
                    name={FORM_NAMES.name}
                    rules={{ required: true, minLength: 3, maxLength: 50 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledInput
                    labelKey="Phone number"
                    name={FORM_NAMES.phoneNumber}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledInput
                    labelKey="Address"
                    name={FORM_NAMES.address}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledSwitch
                    labelKey="Status"
                    name={FORM_NAMES.status}
                  />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
              </Grid>
            )}
          </Card>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              type="button"
              variant="contained"
              onClick={handleDelete}
              color="error"
              disabled={isLoading || isDeleteLoading}
              startIcon={
                isDeleteLoading && (
                  <CircularProgress size="15px" color="inherit" />
                )
              }
            >
              Delete
            </Button>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                disabled={isLoading || isDeleteLoading}
              >
                Cancel
              </Button>
              <Button
                startIcon={
                  isLoading && <CircularProgress size="15px" color="inherit" />
                }
                type="submit"
                variant="contained"
                disabled={isLoading || isDeleteLoading}
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export default UserAddOrEdit;
