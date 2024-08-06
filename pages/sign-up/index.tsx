import {StyledTextField} from "@/components/form-control";
import {AuthForm, AuthFormTitle} from "@/components/onboarding/auth-form";
import {CreateAccountLayout} from "@/components/onboarding/create-account-layout";
import {Divider} from "@/components/onboarding/divider";
import {useLocalStorage} from "@/helpers/use-local-storage";
import {yupResolver} from "@hookform/resolvers/yup";
import {Google} from "@mui/icons-material";
import {Box, Button, FormLabel, Typography} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/router";
import {useCallback, useEffect} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {useTranslations} from "next-intl";

interface FormSchema {
    email: string;
}

const schema = yup.object({
    email: yup.string().required("Email is required").email("Invalid email"),
});

export default function SignUp() {
    const t = useTranslations('waipify.ui');
    const router = useRouter();
    const [local, setLocal] = useLocalStorage<FormSchema>("newAccount");

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormSchema>({
        defaultValues: local,
        resolver: yupResolver(schema),
    });

    const onSubmit = useCallback(
        (form: FormSchema) => {
            setLocal({...local, ...form});
            router.push("/create-account");
        },
        [local, router, setLocal]
    );

    useEffect(() => {
        reset(local);
    }, [local, reset]);

    return (
        <CreateAccountLayout>
            <AuthForm sx={{justifyContent: "space-between"}}>
                <Box>
                    <AuthFormTitle mt={4}>{t("sign_up.sign_up")}</AuthFormTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box marginBottom={2}>
                            <FormLabel htmlFor="email">{t("sign_up.email")}</FormLabel>
                            <StyledTextField
                                fullWidth
                                id="email"
                                placeholder={t("sign_up.email_address")}
                                {...register("email")}
                            />
                            {errors.email ? (
                                <Typography color="error">{errors.email.message}</Typography>
                            ) : (
                                <></>
                            )}
                        </Box>
                        <Button type="submit" fullWidth variant="contained">
                            {t("sign_up.sign_up_email")}
                        </Button>
                    </form>
                    <Divider>or</Divider>
                    <Button fullWidth variant="outlined" startIcon={<Google/>}>
                        {t("sign_up.sign_up_google")}
                    </Button>
                </Box>
                <Typography sx={{textAlign: "center"}} fontSize={12}>
                    {t("sign_up.existing_account")}{" "}
                    <Link href="/auth/sign-in">{t("sign_up.sign_in")}</Link>
                </Typography>
            </AuthForm>
        </CreateAccountLayout>
    );
}
