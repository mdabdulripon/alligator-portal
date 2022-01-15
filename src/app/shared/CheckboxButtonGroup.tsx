import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    selectedItems?: string[];
    onChange: (items: string[]) => void;
}

export default function CheckboxButtonGroup({items, selectedItems, onChange}: Props) {

    const [checkedItems, setCheckedItems] = useState(selectedItems || []);

    function handleChecked(value: string) {
        const idx = checkedItems.findIndex(item => item === value);
        let newSelectedItems: string[] = [];
        if(idx === -1) {
            newSelectedItems = [...checkedItems, value];
        } else {
            newSelectedItems = checkedItems.filter(item => item !== value);
        }
        setCheckedItems(newSelectedItems);
        onChange(newSelectedItems);
    }

    return (
        <FormGroup >
            { items.map( item => (
                <FormControlLabel 
                    control={<Checkbox 
                        checked={ checkedItems.indexOf(item) !== -1 }
                        onClick={ () => handleChecked(item)}
                    />} 
                    label={item} 
                    key={item} 
                />
            ))}
        </FormGroup>
    )
}