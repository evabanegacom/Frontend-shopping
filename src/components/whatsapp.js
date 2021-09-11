import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const Whatsapp = () => {
  const Whatsap = styled.div`
    
    a {
      background: transparent;
      color: #fff;
      text-align: center;
      font-size: 25px;
    }

    p {
        margin-bottom: 10px;
        line-height: 1.9;
    }
  `;
  return (
    <Whatsap>
      <p>
        Speak with us on whatsapp to place an order{" "}
        <Button
          style={{ background: "#25d366", height: "30px" }}
          variant="contained"
          color="primary"
        >
          <a
            href="https://wa.me/2348066698252"
            class="whatsapp_float"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa fa-whatsapp whatsapp-icon"></i>
          </a>
        </Button>
      </p>
    </Whatsap>
  );
};

export default Whatsapp;
