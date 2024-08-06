import { useState } from "react";
import csv from 'csvtojson';
import { request } from "@/helpers/request";
import styled from "@emotion/styled";
import { Description, FileUploadOutlined } from "@mui/icons-material";
import { Alert, Box, CircularProgress, Snackbar, Typography } from "@mui/material";
import {useTranslations} from "next-intl";

const StyledUploadFile = styled.label`
  display: flex;
  align-items: center;
  border: 1px dashed #9ca5af;
  // background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Icon = styled.div`
  padding: 1rem;
  width: 42px;
  height: 42px;
  background-color: #f6f7f9;
  position: relative;
  margin-right: 1rem;
  border-radius: 100%;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Input = styled.input`
  display: hidden;
  margin-top: 10px;
`

export const UploadProvidersCSV = () => {
  const t = useTranslations('waipify.ui');

  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean | string>(false);

  const getData = async (rawData: string): Promise<void> => {
    setLoading(true);
    const jsonObj: Record<string, string>[] = await new Promise((resolve, reject) => {
      csv({
        trim: true,
      }).fromString(rawData)
        .subscribe((row) => {
        })
        .on('error', (err) => {
          console.log('error', err);
          reject(err);
        })
        .then((jsonObj) => {
          resolve(jsonObj);
        });
    });

    const data = [];
    for (const row of jsonObj) {
      data.push({
        logo: row['provider_logo'],
        name: row['provider_name'],
        type: row['provider_type'],
        is_internal: false,
        description: row['description'],
        headquarters_city_id: row['city'],
        headquarters_country_id: row['country'],
        headquarters_address_line: row['address1'],
        headquarters_address_number: row['address2'],
        headquarters_zip_code: row['zip_code'],
      })
    }

    try {
      await request(`/api/impact360/provider/bulk_creation`, {
        method: "POST",
        body: data,
      });
    } catch (e) {
      setShowError((e as { error: string }).error);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  }

  const changeFile = (e: any): void => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const tmpName = file.name.split('.');
    const extension = tmpName.pop()?.toLowerCase();
    if (!extension || extension !== 'csv') {
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const dt = evt.target.result || '';
      getData(dt);
    };
    reader.readAsBinaryString(file);
  }

  return (
    <>
      {loading ?
        (
          <CircularProgress
            sx={{ marginRight: "1rem" }}
            size={20}
            color="inherit"
          />
        ) : (
          <StyledUploadFile>
            <Icon>
              <FileUploadOutlined />
            </Icon>
            <Box>
              <Typography>{t("general.upload_providers_csv")}</Typography>
              <Input
                type="file"
                accept=".csv"
                onChange={changeFile}
              />
            </Box>
          </StyledUploadFile>
        )
      }
      <Snackbar
        open={!!showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error">{showError}</Alert>
      </Snackbar>
    </>
  );
};
