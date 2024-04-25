"use client";

import {
  ControlledImageUploader,
  ControlledInput,
  ControlledSwitch,
} from "@/components/form";
import { useAddUserMutation } from "@/provider/redux/features/users/UsersApi";
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
import { FormProvider, useForm } from "react-hook-form";

const FORM_NAMES = {
  avatar: "avatar",
  name: "name",
  phoneNumber: "phoneNumber",
  address: "address",
  status: "status",
};

const UserAddOrEdit = () => {
  const router = useRouter();

  const [addUser, { isLoading }] = useAddUserMutation();

  const formStore = useForm({
    defaultValues: {
      [FORM_NAMES.name]: "",
      [FORM_NAMES.phoneNumber]: "",
      [FORM_NAMES.address]: "",
      [FORM_NAMES.avatar]: "",
      [FORM_NAMES.status]: true,
    },
  });

  const { handleSubmit } = formStore;

  const submitHandler = handleSubmit(async (data) => {
    try {
      await addUser({
        [FORM_NAMES.name]: get(data, FORM_NAMES.name, ""),
        [FORM_NAMES.phoneNumber]: get(data, FORM_NAMES.phoneNumber, ""),
        [FORM_NAMES.address]: get(data, FORM_NAMES.address),
        [FORM_NAMES.avatar]: get(data, FORM_NAMES.avatar),
        [FORM_NAMES.status]: get(data, FORM_NAMES.status),
      });

      router.back();
    } catch (error) {}
  });

  return (
    <FormProvider {...formStore}>
      <form onSubmit={submitHandler}>
        <Box maxWidth="1000px">
          <Card sx={{ padding: "20px" }}>
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
                <ControlledInput labelKey="Address" name={FORM_NAMES.address} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ControlledSwitch labelKey="Status" name={FORM_NAMES.status} />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
          </Card>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" disabled={isLoading}>
                Cancel
              </Button>
              <Button
                startIcon={
                  isLoading && <CircularProgress size="15px" color="inherit" />
                }
                type="submit"
                variant="contained"
                disabled={isLoading}
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
