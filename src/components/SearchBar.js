import React, { useState } from 'react';
import { Autocomplete, TextField, Button, Box, Paper } from '@mui/material';

function SearchBar({ items, onSearch }) {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (selected) {
      onSearch(selected.name);
    } else {
      onSearch(input);
    }
  };

  return (
    <Paper sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: 3,
      p: { xs: 1, sm: 2 },
      borderRadius: 5,
      boxShadow: "0 4px 20px #021608ff",
      background: "rgba(234,246,255,0.95)"
    }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          width: "100%"
        }}
      >
        <Autocomplete
          sx={{ width: { xs: "100%", sm: 260 } }}
          options={items}
          getOptionLabel={(option) => option.name}
          inputValue={input}
          onInputChange={(e, value, reason) => {
            setInput(value);
            setSelected(null);
            if (value === "") {
              onSearch("");
            }
          }}
          onChange={(e, value, reason) => {
            setSelected(value);
            if (value) {
              onSearch(value.name);
            }
            else if (reason === "clear") {
              setInput("");
              onSearch("");
            }
          }}
          renderInput={(params) =>
            <TextField
              {...params}
              label="חפש פריט..."
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 2,
                background: "#fff",
                width: "100%"
              }}
            />
          }
          noOptionsText="אין תוצאות"
          autoHighlight
          clearOnBlur={false}
          isOptionEqualToValue={(option, value) => option && value && option.id === value.id}
        />
        <Button
          variant="contained"
          type="submit"
          color="success"
          sx={{
            px: { xs: 2, sm: 3 },
            py: 1,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: { xs: 15, sm: 16 },
            width: { xs: "100%", sm: "auto" }
          }}>
          חפש
        </Button>
      </Box>
    </Paper>
  );
}

export default SearchBar;
