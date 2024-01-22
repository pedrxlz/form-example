"use client";
import { getUsers } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { registerSchema } from "../zodSchema/register";
import NameFieldAutocomplete from "./nameFieldAutocomplete";

type FormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const methods = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(data: FormData) {
    getUsers().then((users) => {
      const user = users.find((user) => user.name === data.name);

      if (!user) {
        return;
      }

      console.log({
        pessoa: user.id,
        telefone: data.phone,
        email: data.email,
      });
    });
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h6" gutterBottom>
          Formulário
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack spacing={2} direction="column" useFlexGap mt={4}>
              <NameFieldAutocomplete />
              <TextField
                {...methods.register("phone", { required: true })}
                label="Telefone"
                fullWidth
                variant="standard"
                error={!!methods.formState.errors.phone}
                helperText={methods.formState.errors.phone?.message}
              />

              <TextField
                {...methods.register("email", { required: true })}
                label="Email"
                fullWidth
                autoComplete="email"
                variant="standard"
                error={!!methods.formState.errors.email}
                helperText={methods.formState.errors.email?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Enviar
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Paper>
    </Container>
  );
}
