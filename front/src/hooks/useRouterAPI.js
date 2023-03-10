import React, { useEffect, useState, useRef } from "react";
import axios from "tools/axios";

const wrapUseRouterAPI =
  (method) =>
  (url, data, dep = []) => {
    const [res, setRes] = useState({});
    const [loading, setLoading] = useState(true);
    const latestReqID = useRef(0);

    useEffect(() => {
      const currentReqID = ++latestReqID.current;
      let isUnmounted = false;
      const asyncFun = async () => {
        const res = await axios({ url, method, data });
        if (res.status !== 200) {
          throw new Error("Status is not 200!");
        }
        // Put Additional Data Validation Here
        if (isUnmounted || currentReqID !== latestReqID.current) return;
        setRes({ error: null, data: res.data });
        setLoading(false);
      };

      asyncFun().catch((e) => {
        if (isUnmounted || currentReqID !== latestReqID.current) return;
        setRes({ error: e, data: null });
        setLoading(false);
      });

      return () => {
        isUnmounted = true;
      };
    }, [url, JSON.stringify(dep), JSON.stringify(data)]);

    return [res.error, res.data, loading];
  };

const useRouterAPI = {
  get: wrapUseRouterAPI("get"),
  post: wrapUseRouterAPI("post"),
};
export default useRouterAPI;

const get = useRouterAPI.get;
const post = useRouterAPI.post;
export { get, post };
