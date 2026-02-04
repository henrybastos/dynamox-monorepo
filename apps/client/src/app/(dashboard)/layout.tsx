'use client';
import React from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem,  
  ListItemButton,
  ListItemIcon, 
  ListItemText,
  Avatar,
  Tooltip
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  PrecisionManufacturing as MachinesIcon, 
  SettingsInputComponent as MonitoringIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
// import ListItemButton from '@ui/list/list-item-button';

const DRAWER_WIDTH = 260;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Machines', icon: <MachinesIcon />, path: '/machines' },
    { text: 'Monitoring', icon: <MonitoringIcon />, path: '/monitoring' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      <Toolbar sx={{ px: [2], display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>D</Box>
          <Typography variant="h6" fontWeight="bold" color="primary">Dynamox</Typography>
        </Box>
      </Toolbar>

      <Divider sx={{ mx: 2, mb: 2 }} />
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'white' : 'text.secondary',
                  '&:hover': {
                    bgcolor: isActive ? 'primary.dark' : 'rgba(105, 39, 70, 0.08)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText sx={{ color: isActive ? 'white' : 'text.secondary' }} primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ mx: 2 }} />
      <List sx={{ p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            sx={{ borderRadius: 2, color: 'error.main', '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.08)' } }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight="600">
            {menuItems.find(item => item.path === pathname)?.text || 'System'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton size="small">
              <NotificationsIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1.5 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                <Typography variant="body2" fontWeight="600">{session?.user?.email?.split('@')[0]}</Typography>
                <Typography variant="caption" color="text.secondary">Maintainer</Typography>
              </Box>
              <Tooltip title="Profile Settings">
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main', color: 'white' }}>
                  {session?.user?.email?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: '64px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
