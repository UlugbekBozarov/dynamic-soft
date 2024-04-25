import { Fragment, ReactNode, FC } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { get } from "lodash";
// import { ChevronRight } from "assets/icons";
// import { clearCookie } from "services/storage";

// import { StyledIconBlock } from "./Sidebar.style";

interface ItemTpe {
  id: string;
  link: string;
  disabled?: boolean;
  labelKey: string;
  icon?: ReactNode;
  children?: Array<ItemTpe>;
}

interface ListItemProps {
  item: ItemTpe;
}

const ListItem: FC<ListItemProps> = ({ item }) => {
  // const { t } = useTranslation();
  // const navigate = useNavigate();
  // const location = useLocation();
  let open = false;

  const goTo = (id: string, link: string) => () => {
    if (get(item, "children")) {
      // setOpen((prev) => !prev);
      open = !open;
    } else {
      switch (id) {
        case "logout": {
          // clearCookie();
          window.location.href = "/";
          break;
        }
        default: {
          // navigate(link);
        }
      }
    }
  };

  const childGoTo = (parentLink: string, childLink: string) => () => {
    // navigate(`${parentLink}${childLink}`);
  };

  return (
    <Fragment>
      <ListItemButton
        // selected={location.pathname.startsWith(get(item, "link"))}
        // onClick={goTo(get(item, "id"), get(item, "link"))}
        disabled={get(item, "disabled", false)}
        key={get(item, "id")}
      >
        <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            width="28px"
            height="28px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {get(item, "icon", "")}
          </Box>
        </ListItemIcon>
        <ListItemText primary={get(item, "labelKey")} />
        {get(item, "children") && (
          <Box
            className={open ? "show" : ""}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "& svg": {
                transition: "all 0.3s",
              },
              "&.show svg": {
                transform: "rotate(90deg)",
              },
            }}
          >
            Icon
            {/* <ChevronRight /> */}
          </Box>
        )}
      </ListItemButton>
      {get(item, "children") && (
        <Collapse in={open}>
          <List disablePadding sx={{ backgroundColor: "primary" }}>
            {get(item, "children", [])?.map((child) => (
              <ListItemButton
                // onClick={childGoTo(
                //   get(item, "link", ""),
                //   get(child, "link", "")
                // )}
                disabled={get(child, "disabled", false)}
                sx={{ pl: 9 }}
                key={get(child, "id")}
              >
                <ListItemText primary={get(child, "labelKey")} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
};

export default ListItem;
