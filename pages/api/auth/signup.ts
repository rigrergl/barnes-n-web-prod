import type { NextApiRequest, NextApiResponse } from "next";
import connectionPool from "@/lib/db";
import isInputClean from "@/lib/isInputClean";

const bcrypt = require("bcryptjs");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    username,
    password,
    email,
    fullname,
    phone,
    street,
    optaddress,
    city,
    state,
    zipcode,
  } = req.body;

  if (!isInputClean(username) || 
      !isInputClean(password) ||
      !isInputClean(email) ||
      !isInputClean(fullname) ||
      !isInputClean(phone) ||
      !isInputClean(street) ||
      !isInputClean(optaddress) ||
      !isInputClean(city) ||
      !isInputClean(state) ||
      !isInputClean(zipcode)) {
    return res.status(422).send({
        error: true,
        message: "Input contains SQL escape characters. Rejected"
    });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query =
    "INSERT INTO Users (username, email, hashedPassword, fullname, phone, street, optaddress, city, state, zipcode) " +
    `VALUES ('${username}', '${email}', '${hashedPassword}', '${fullname}', '${phone}', '${street}', '${optaddress}', '${city}', '${state}', '${zipcode}')`;

  try {
    connectionPool.query(query, (error: any, _results: any, _fields: any) => {
      if (error && error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .send({ message: "Username or email already in use" });
      } else if (error) {
        throw error;
      }

      return res.status(200).send({
        message: "Account successfully created!",
      });
    });
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};
