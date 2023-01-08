import {
  Avatar,
  Checkbox,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const ManageListItem = ({
  item: { _id, name, price, imageURL, description },
  handleEditItem,
  handleCheck,
  isChecked
}) => {
  return (
    <ListItem
      key={_id}
      secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={() => handleEditItem(_id)}>
          <EditIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={() => handleCheck(_id)} dense>
        <ListItemIcon>
          <Checkbox edge="start" checked={isChecked(_id)} tabIndex={-1} disableRipple />
        </ListItemIcon>
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
  );
};
