require("dotenv").config();

module.exports = {
  Token: process.env.Token || "",
  Prefix: process.env.Prefix || "",
  OwnersId: process.env.OwnersId?.split(",") || [],
  MusicRoleId: process.env.MusicRoleId || "",
  ChannelId1: "",
  ChannelId2: "",
  CategoryId1: "",
  CategoryId2: "",
};
