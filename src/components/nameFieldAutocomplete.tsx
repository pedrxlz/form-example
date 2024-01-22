"use client";
import { UsersResponse, getUsers } from "@/services/users";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function NameFieldAutocomplete() {
  const { register, formState, getValues, setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<UsersResponse>([]);

  const loading = useMemo(
    () => open && options.length === 0,
    [open, options.length]
  );

  function handleOpen() {
    const name = getValues("name");

    if (name === "") return;

    setOpen(true);
  }

  function handleClose() {
    setOpen(false);

    const user = options.find((user) => user.name === getValues("name"));

    if (!user) {
      setValue("name", "");
    }
  }

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const users = await getUsers();

      if (active) {
        setOptions([...users]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length > 0) {
      setOpen(true);
    }
    setValue("name", event.target.value);
  }

  return (
    <Autocomplete
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          {...register("name", { required: true })}
          onChange={handleInputChange}
          label="Pessoa"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          error={!!formState.errors.name}
        />
      )}
    />
  );
}
