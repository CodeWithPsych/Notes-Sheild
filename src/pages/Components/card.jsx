import React, { useContext } from "react";
import Card from "@mui/material/Card";
import Popover from "@mui/material/Popover";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const BasicCard = ({
  tag,
  title,
  description,
  date,
  handleDelete,
  handleEdit,
  readMore,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [actionType, setActionType] = React.useState(null);

  const handlePopoverOpen = (event, action) => {
    setActionType(action);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Card sx={{ minWidth: 250, maxWidth: 250, maxHeight: 280, minHeight: 280 }}>
      <CardContent>
        <div
          className="top"
          style={{
            display: "flex",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <Button
            variant="contained"
            color={tag === "General" ? "error" : "primary"}
          >
            {tag}
          </Button>
          <div
            className="topRight"
            style={{ padding: "4px", display: "flex", gap: "7px", zIndex: 1 }}
          >
            <EditIcon
              className="edit"
              style={{ cursor: "pointer" }}
              onMouseEnter={(event) => handlePopoverOpen(event, "Edit")}
              onMouseLeave={handlePopoverClose}
              onClick={() => {
                handleEdit();
              }}
            />
            <DeleteIcon
              className="delete"
              style={{ cursor: "pointer" }}
              onMouseEnter={(event) => handlePopoverOpen(event, "Delete")}
              onMouseLeave={handlePopoverClose}
              onClick={handleDelete}
            />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1.3 }}>{actionType}</Typography>
            </Popover>
          </div>
        </div>

        <Typography variant="h5" component="div" style={{ marginTop: "8px" }}>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {date}
        </Typography>
        <Typography
          variant="body2"
          sx={{ height: 80, overflow: "hidden", textOverflow: "ellipsis" }}
          style={{ display: "flex", flexWrap: "hidden" }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            readMore();
          }}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BasicCard;
