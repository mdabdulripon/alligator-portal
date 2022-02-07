import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
    items: any[],
    multipleSelection: boolean,
    closeOnSelect: boolean,
    onChange: (items: string[]) => void;
}

export default function SearchAndSelect( { items, multipleSelection, closeOnSelect, onChange }: Props) {
    return (
        <Autocomplete
            multiple={multipleSelection}
            options={items}
            disableCloseOnSelect={closeOnSelect}
            getOptionLabel={(item) => item.name || item.text || item.value || item.title}
            onChange={(event, value) => onChange(value)}
            renderOption={(props, item, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />{item.name || item.text || item.value || item.title}
                </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Entities"/>
          )}
        />
    );
}