import React, { useState } from 'react';
import FacilitySearchCreate from './FacilitySearchCreate';


const FacilitiesContent = () => {

  return (
    <>
      <div className='h-[10%] shadow-lg flex justify-between items-center pl-4 pr-8'>
        <FacilitySearchCreate />
      </div>
      <div className='flex-grow'>
        Facility Content
      </div>
    </>
  );
};





            {/* 
          </div>
          <div className={isTab.roomTab}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Choose a room
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please select an existing building. Or create a new one.
            </Typography>
            {!props.optionList && (
              <Field
                options={null}
                name="room"
                component={SelectFormField}
                id="standard-select-room"
                label="No room available"
                value={roomValue}
                select
                variant="standard"
              />
            )}
            {props.optionList &&
              (!isCreated ? (
                <Field
                  options={props.optionList}
                  name="room"
                  component={SelectFormField}
                  id="standard-select-room"
                  label="Select a room"
                  value={roomValue}
                  select
                  variant="standard"
                  onOpen={() => {
                    setIsCreated(false);
                    setIsSelected(true);
                  }}
                  onChange={(e) => {
                    setRoomValue(e.target.value);
                    values.room = e.target.value;
                  }}
                />
              ) : (
                <Field
                  options={props.optionList}
                  name="room"
                  select
                  component={SelectFormField}
                  id="standard-select-room"
                  label="No room to select"
                  defaultValue=""
                  value=""
                  variant="standard"
                  onOpen={() => {
                    setIsCreated(false);
                    setIsSelected(true);
                  }}
                />
              ))}
            <button
              onClick={() => {
                setIsCreated(true);
                setIsSelected(false);
              }}
              className="absolute top-[7.5rem] right-[4rem] rounded bg-auto-white p-2 hover:text-light-important hover:ring-2  hover:ring-gray-700"
            >
              Create a new <span className="text-light-important">room</span>
            </button>
            {isCreated && !isSelected ? (
              <div className="mt-6">
                <Field
                  name="roomname"
                  component={TextFormField}
                  required
                  id="roomname-required"
                  label="Room Name"
                  helperText="Please type the name of your room"
                />
                <Field
                  name="roomlabel"
                  component={TextFormField}
                  required
                  id="roomlabel-required"
                  label="Room Label"
                  helperText="Please indicate the label of your room"
                />
              </div>
            ) : null}
            <button
              className="absolute bottom-[7.5rem] left-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
              type="button"
              onClick={() =>
                setTab({ buildingTab: '', roomTab: 'hidden', bedTab: 'hidden' })
              }
            >
              Back
            </button>
            <button
              className="absolute bottom-[7.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
              type="button"
              onClick={() => {
                console.log(assetCreationObj);
                if (!values.roomname) {
                  assetCreationObj[values.building][values.room] = {
                    name: values.room,
                  };
                } else {
                  assetCreationObj[values.buildingname][values.roomname] = {
                    name: values.roomname,
                    label: values.roomlabel,
                    type: 'ROOM',
                    full: 0,
                  };
                }
                console.log(assetCreationObj);
                setTab({ buildingTab: 'hidden', roomTab: 'hidden', bedTab: '' });
              }}
            >
              Next
            </button>
          </div>
          <div className={isTab.bedTab}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Choose a bed
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please select an existing bed. Or create a new one.
            </Typography>
            {!props.optionList && (
              <Field
                options={null}
                name="bed"
                component={SelectFormField}
                id="standard-select-bed"
                label="No bed available"
                value={bedValue}
                select
                variant="standard"
              />
            )}
            {props.optionList &&
              (!isCreated ? (
                <Field
                  options={props.optionList}
                  name="bed"
                  component={SelectFormField}
                  id="standard-select-bed"
                  label="Select a bed"
                  value={bedValue}
                  select
                  variant="standard"
                  onOpen={() => {
                    setIsCreated(false);
                    setIsSelected(true);
                  }}
                  onChange={(e) => {
                    setBedValue(e.target.value);
                    values.bed = e.target.value;
                  }}
                />
              ) : (
                <Field
                  options={props.optionList}
                  name="bed"
                  select
                  component={SelectFormField}
                  id="standard-select-bed"
                  label="No bed to select"
                  defaultValue=""
                  value=""
                  variant="standard"
                  onOpen={() => {
                    setIsCreated(false);
                    setIsSelected(true);
                  }}
                />
              ))}
            <button
              onClick={() => {
                setIsCreated(true);
                setIsSelected(false);
              }}
              className="absolute top-[7.5rem] right-[4rem] rounded bg-auto-white p-2 hover:text-light-important hover:ring-2  hover:ring-gray-700"
            >
              Create a new <span className="text-light-important">bed</span>
            </button>
            {isCreated && !isSelected ? (
              <div className="mt-6">
                <Field
                  name="bedname"
                  component={TextFormField}
                  required
                  id="bedname-required"
                  label="Bed Name"
                  helperText="Please type the name of your bed"
                />
                <Field
                  name="bedlabel"
                  component={TextFormField}
                  required
                  id="bedlabel-required"
                  label="Bed Label"
                  helperText="Please indicate the label of your bed"
                />
              </div>
            ) : null}
            <button
              className="absolute bottom-[7.5rem] left-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
              type="button"
              onClick={() =>
                setTab({ buildingTab: 'hidden', roomTab: '', bedTab: 'hidden' })
              }
            >
              Back
            </button>
            <button
              onClick={() => {
                if (!values.roomname) {
                  assetCreationObj[values.building][values.room][values.bedname] = {
                    name: values.bedname,
                    label: values.bedlabel,
                    type: 'BED',
                    full: 0,
                  };
                } else {
                  assetCreationObj[values.buildingname][values.roomname][values.bedname] =
                    {
                      name: values.bedname,
                      label: values.bedlabel,
                      type: 'BED',
                      full: 0,
                    };
                }
              }}
              className="absolute bottom-[7.5rem] right-[4rem] rounded bg-light-important px-4 py-2 text-auto-white hover:bg-auto-black hover:text-light-important"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}; */}


// const schema1 = yup.object(
//   {
//     buildingname: yup.string().when('buildingname', (val, schema) => {
//       if (val?.length > 0) {
//         return yup.string().min(5, 'min 5').max(255, 'max 255').required('Required');
//       } else {
//         return yup.string().notRequired();
//       }
//     }),
//     building: yup.array().nullable(),
//     buildinglabel: yup.string().when('buildinglabel', (val, schema) => {
//       if (val?.length > 0) {
//         return yup.string().min(5, 'min 5').max(255, 'max 255').required('Required');
//       } else {
//         return yup.string().notRequired();
//       }
//     }),
//     roomname: yup.string().when('roomname', (val, schema) => {
//       if (val?.length > 0) {
//         return yup.string().min(5, 'min 5').max(255, 'max 255').required('Required');
//       } else {
//         return yup.string().notRequired();
//       }
//     }),
//     room: yup.array().nullable(),
//     roomlabel: yup.string().when('roomlabel', (val, schema) => {
//       if (val?.length > 0) {
//         return yup.string().min(5, 'min 5').max(255, 'max 255').required('Required');
//       } else {
//         return yup.string().notRequired();
//       }
//     }),
//     bedname: yup.string().when('bedname', (val, schema) => {
//       if (val?.length > 0) {
//         return yup.string().min(5, 'min 5').max(255, 'max 255').required('Required');
//       } else {
//         return yup.string().notRequired();
//       }
//     }),
//     bed: yup.array().nullable(),
//     bedlabel: yup.string().when('bedlabel', (val, schema) => {
//       if (val?.length > 0) {
//         return yup.string().min(5, 'min 5').max(255, 'max 255').required('Required');
//       } else {
//         return yup.string().notRequired();
//       }
//     }),
//   },
//   [
//     ['buildingname', 'buildingname'],
//     ['buildinglabel', 'buildinglabel'],
//     ['roomname', 'roomname'],
//     ['roomlabel', 'roomlabel'],
//     ['bedname', 'bedname'],
//     ['bedlabel', 'bedlabel'],
//   ],
// );

export default FacilitiesContent;


