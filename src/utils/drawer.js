import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

const Drawer = () => {
    const [ openDrawer, setOpenDrawer] = useState(true)
    return (
        <Drawer>
          <List>
              <ListItem>
                  <ListItemText>COURSES</ListItemText>
              </ListItem>
          </List> 
        </Drawer>
    )
}

export default Drawer
