import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Typography } from "@mui/material";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/system";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";

export const HomePage = memo(() => {
  const { formatMessage } = useIntl();

  return <Fragment>
      <Seo title="MobyLab Web App | Home" />
      <WebsiteLayout>
        <div
            style={{
              background: 'white',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              minHeight: '100vh',
              padding: '2rem',
            }}
        >
          <div
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '2rem',
                fontSize: '1.7rem',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                maxWidth: '50%',
              }}
          >
            <h1 style={{ color: 'blue', marginBottom: '2rem', fontSize: '5rem' }}>
              O cariera de succes incepe cu o educatie de calitate!
            </h1>
            <p style={{ fontSize: '1.75rem' }}>
              Obtinand cunostintele de care aveti nevoie in subiectele care va preocupa, veti fi gata sa va atingeti potentialul.
            </p>
              <Button
                  component={Link}
                  to="/subjects"
                  variant="outlined"
                  style={{
                      color: 'blue',
                      borderColor: 'blue',
                      textTransform: 'none',
                      marginTop: '1rem',
                      padding:'1rem 2rem',
                      fontSize:'1.2rem',
                  }}
              >
                  Materii
              </Button>
          </div>

          <div style={{ position: 'relative', width: '50%', height: 'auto' }}>
            <img
                src="https://cardiff.imgix.net/__data/assets/image/0018/480015/chemistry-students-in-lecture-theatre.jpeg"
                alt="Chemistry students in lecture theatre"
                style={{ width: '100%', top: '100%',height: '100%', objectFit: 'cover', borderRadius: '10px' }}
            />
            <img
                src="https://i0.wp.com/unibuc.ro/wp-content/uploads/2020/01/camine-studentesti.jpg"
                alt="Student housing"
                style={{
                  position: 'absolute',
                  top: '60%',
                  right: '5%',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  boxShadow: '0 10px 200px rgba(0, 0, 50, 0.2)',
                }}
            />
          </div>
        </div>
          <h1></h1>
          <h1></h1>
          <h1></h1>
          <p></p>
          <h1></h1>
          <h1></h1>
          <br/>
          <br/>
          <br/>
      </WebsiteLayout>
    </Fragment>
});
