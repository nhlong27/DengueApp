// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { styled } from '@mui/material/styles';
import MuiDivider from '@mui/material/Divider';
import { RiNurseFill } from 'react-icons/ri';
import { MdBedroomChild } from 'react-icons/md';

export const StatisticsCard = (props) => {
  const [isRoomContainer, setIsRoomContainer] = useState(false);
  let containerStyle = isRoomContainer
    ? 'opacity-100'
    : 'opacity-0 absolute right-[8rem] invisible';

  return (
    <Card sx={{ backgroundColor: '#F7F7FF', fontSize: 25 }}>
      <div className="flex items-start justify-start p-4">
        <div className="z-20 rounded-lg bg-auto-white px-2 py-4 ring-2 ring-black">
          <span className="text-blue-600">Room Name:</span> {props.component.R_Number}
        </div>
        <button
          onClick={() => {
            setIsRoomContainer((state) => !state);
          }}
          className="rounded bg-auto-white bg-opacity-5 p-4 text-base font-bold text-gray-400 transition-all duration-500 hover:bg-opacity-100  hover:text-gray-600 hover:ring-2 hover:ring-gray-200 focus:rounded-r-lg focus:text-auto-black"
        >
          {isRoomContainer ? (
            <AiOutlineUp size={30} color="black" />
          ) : (
            <AiOutlineDown size={30} color="black" />
          )}
        </button>
        {isRoomContainer ? null : (
          <div className="ml-16 flex gap-8">
            <div className=" rounded-t-lg bg-auto-white py-2 pl-4 pr-2 ring-2 ring-black">
              <span className="text-blue-600">Beds:</span> {props.component.beds.length}
            </div>
            <div className=" rounded-b-lg bg-auto-white py-2 pl-4 pr-2 ring-2 ring-black">
              <span className="text-blue-600">Nurse:</span>{' '}
              {props.component.nurses.length}
            </div>
          </div>
        )}

        <div className={`${containerStyle} transition-all duration-300`}>
          <CardContent>
            <Grid container spacing={[5, 0]}>
              <DepositWithdraw
                bedData={props.component.beds}
                nurseData={props.component.nurses}
              />
            </Grid>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

// Styled Divider component
export const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(5, 0),
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export const DepositWithdraw = (props) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: ['column', 'column', 'row'],
        width: 600,
        // border: 1,
        backgroundColor: '#F7F7FF',
        border: '2px solid black',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title="Beds"
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.1 } }}
          action={<Typography variant="caption">Assigned</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' },
          }}
        />
        <CardContent sx={{ pb: (theme) => `${theme.spacing(5.5)} !important` }}>
          {props.bedData.map((item, index) => {
            return (
              <Box
                key={item.B_Number}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: index !== props.bedData.length - 1 ? 2 : 0,
                }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <MdBedroomChild />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {item.B_Number}
                    </Typography>
                  </Box>
                  {item.Assign !== 'No' ? (
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, color: 'success.main' }}
                    >
                      {item.Assign}
                    </Typography>
                  ) : (
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, color: 'error.main' }}
                    >
                      No
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </CardContent>
      </Box>

      <Divider flexItem />

      <Box sx={{ width: '100%' }}>
        <CardHeader
          title="Nurses"
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.1 } }}
          action={<Typography variant="caption">Status</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' },
          }}
        />
        <CardContent sx={{ pb: (theme) => `${theme.spacing(5.5)} !important` }}>
          {props.nurseData.map((item, index) => {
            return (
              <Box
                key={item.N_Ssd}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: index !== props.nurseData.length - 1 ? 2 : 0,
                }}
              >
                <Box sx={{ minWidth: 36, display: 'flex', justifyContent: 'center' }}>
                  <RiNurseFill />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {item.Fname}
                    </Typography>
                    <Typography variant="caption">{item.Lname}</Typography>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: 'success.main' }}
                  >
                    Available
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </CardContent>
      </Box>
    </Card>
  );
};
