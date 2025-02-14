import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const categories = ['Все категории', 'Недвижимость', 'Авто', 'Услуги'];

type CategoryChipsProps = {
  value: string | undefined;
  onChange: (type: string) => void;
};

export function CategoryChips({ value, onChange }: CategoryChipsProps) {
  const handleClick = (type: string) => {
    const categoryValue = type === 'Все категории' ? '' : type;
    onChange(categoryValue);
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        gap: 3,
        overflow: 'auto',
      }}
    >
      {categories.map((type, index) => (
        <Chip
          key={index}
          onClick={() => handleClick(type)}
          size="medium"
          label={type}
          sx={{
            backgroundColor:
              value === type
                ? ''
                : value === '' && type === 'Все категории'
                  ? ''
                  : 'transparent',
            border: 'none',
          }}
        />
      ))}
    </Box>
  );
}
