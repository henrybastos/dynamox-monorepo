import { createTheme } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import palette from './palette';
import typography from './typography';
import customShadows from './shadows';
import CssBaseline from '@ui/utils/css-baseline';
import Stack from '@ui/layout/stack';
import Paper from '@ui/surfaces/paper';
import Button from '@ui/buttons/button';
import ButtonBase from '@ui/buttons/button-base';
import IconButton from '@ui/buttons/icon-button';
import Toolbar from '@ui/buttons/toolbar';
import Chip from '@ui/data-display/chip';
import Badge from '@ui/data-display/badge';
import Checkbox from '@ui/inputs/checkbox';
import FilledInput from '@ui/inputs/filled-input';
import FormControlLabel from '@ui/inputs/form-control-label';
import InputAdornment from '@ui/inputs/input-adornment';
import InputBase from '@ui/inputs/input-base';
import OutlinedInput from '@ui/inputs/outlined-input';
import Select from '@ui/inputs/select';
import Collapse from '@ui/list/collapse';
import List from '@ui/list/list';
import ListItemButton from '@ui/list/list-item-button';
import ListItemIcon from '@ui/list/list-item-icon';
import ListItemText from '@ui/list/list-item-text';
import MenuItem from '@ui/list/menu-item';
import AppBar from '@ui/navigation/app-bar';
import Drawer from '@ui/navigation/drawer';
import Link from '@ui/navigation/link';
import YearCalendar from '@ui/date-picker/year-calendar';
import MonthCalendar from '@ui/date-picker/month-calendar';
import PaginationItem from '@ui/pagination/pagination-item';
import DataGrid from '@ui/data-grid/data-grid';
import Avatar from '@ui/data-display/avatar';
import AvatarGroup from '@ui/data-display/avatar-group';
import Card from '@ui/cards/card';
import CardMedia from '@ui/cards/card-media';
import CardContent from '@ui/cards/card-content';
import DateCalendar from '@ui/date-picker/date-calendar';
import InputLabel from '@ui/inputs/input-label';
import Divider from '@ui/data-display/divider';

export const theme = createTheme({
  palette,
  typography,
  customShadows,
  mixins: {
    toolbar: {
      minHeight: 130,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1420,
      xl: 1780,
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiStack: Stack,
    MuiPaper: Paper,
    MuiButton: Button,
    MuiButtonBase: ButtonBase,
    MuiIconButton: IconButton,
    MuiToolbar: Toolbar,
    MuiBadge: Badge,
    MuiChip: Chip,
    MuiCheckbox: Checkbox,
    MuiFilledInput: FilledInput,
    MuiFormControlLabel: FormControlLabel,
    MuiInputAdornment: InputAdornment,
    MuiInputBase: InputBase,
    MuiOutlinedInput: OutlinedInput,
    MuiSelect: Select,
    MuiCollapse: Collapse,
    MuiList: List,
    MuiListItemButton: ListItemButton,
    MuiListItemIcon: ListItemIcon,
    MuiListItemText: ListItemText,
    MuiMenuItem: MenuItem,
    MuiInputLabel: InputLabel,
    MuiAppBar: AppBar,
    MuiDrawer: Drawer,
    MuiLink: Link,
    MuiCard: Card,
    MuiCardMedia: CardMedia,
    MuiCardContent: CardContent,
    MuiDivider: Divider,
    MuiAvatar: Avatar,
    MuiDataGrid: DataGrid,
    MuiAvatarGroup: AvatarGroup,
    MuiDateCalendar: DateCalendar,
    MuiMonthCalendar: MonthCalendar,
    MuiYearCalendar: YearCalendar,
    MuiPaginationItem: PaginationItem,
    MuiCssBaseline: CssBaseline,
  },
});
