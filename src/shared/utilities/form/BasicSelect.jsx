import * as React from 'react';
// import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

// function getStyles(name: string, personName: string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function BasicSelect(props) {
  // const theme = useTheme();
  const handleChange = (event) => {
    props.setInput(event.target.value);
  };

  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">{props.name}</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={props.input}
            label={props.name}
            onChange={handleChange}
            style={props.style}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {props.list && props.list.map((ele, index) => {
              return (
                <MenuItem key={index} value={ele}>
                  <span>{ele}</span>
                </MenuItem>
              );
            })}
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
      </div>
    </div>
  );
}
