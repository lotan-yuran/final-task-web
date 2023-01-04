import {
  Avatar,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";

export const ListItemAdmin = ({
  item: { _id, name, price, imageURL, description },
  handleCheck,
  isChecked
}) => {
  return (
    <>
      <ListItem
        key={_id}
        secondaryAction={
          <Checkbox value={_id} edge="end" onChange={event => handleCheck(event)} checked={isChecked(_id)} />
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemAvatar>
            <Avatar src={imageURL} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography component="span" variant="body2" color="text.primary" fontWeight="bold">
                  {name}
                </Typography>
                {` — ${description}`}
              </>
            }
            secondary={
              <>
                <Typography sx={{ display: "block" }} component="span" variant="body2" color="text.secondary">
                  {`id: ${_id}`}
                </Typography>
                {`price: ${price}$`}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};
