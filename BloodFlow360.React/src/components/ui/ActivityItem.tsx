import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
}

export default function ActivityItem({
  title,
  subtitle,
}: Props) {
  return (
    <ListItem disablePadding>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>

      <ListItemText
        primary={title}
        secondary={subtitle}
      />
    </ListItem>
  );
}
