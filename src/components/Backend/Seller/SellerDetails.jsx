import PropTypes from "prop-types";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Chip,
} from "@material-tailwind/react";

/**
 * SellerDetails modal
 * - Shows all seller fields
 * - Handles documents: single string | array of strings | array of objects
 * - Renders image thumbnails for images, file card for PDFs/others
 */
const SellerDetails = ({ seller, onClose }) => {
  if (!seller) return null;

  // Normalize documents to array of { url, filename }
  const rawDocs = seller.documents;
  let docsArr = [];
  if (rawDocs) {
    if (Array.isArray(rawDocs)) docsArr = rawDocs;
    else docsArr = [rawDocs];
  }

  const normalizeDoc = (d) => {
    if (!d) return null;
    if (typeof d === "string") {
      const url = d;
      const filename = decodeURIComponent(url.split("/").pop().split("?")[0]);
      return { url, filename };
    }
    // object form (Cloudinary result or custom)
    if (typeof d === "object") {
      const url = d.url || d.secure_url || d.path || d.location || d.file || "";
      const filename =
        d.filename ||
        d.originalname ||
        (url && decodeURIComponent(url.split("/").pop().split("?")[0])) ||
        "file";
      return { url, filename };
    }
    return null;
  };

  const documents = docsArr.map(normalizeDoc).filter(Boolean);

  // helper to detect image/pdf by file extension
  const getExt = (filename = "") => filename.split(".").pop().toLowerCase();
  const isImageExt = (ext) =>
    ["jpg", "jpeg", "png", "webp", "gif", "bmp"].includes(ext);
  const isPdfExt = (ext) => ext === "pdf";

  return (
    <Dialog open={true} handler={onClose} size="lg">
      <DialogHeader>Seller Details</DialogHeader>

      <DialogBody divider>
        {/* Top grid: Business + Owner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Typography variant="h6" color="blue-gray">
              Business Information
            </Typography>
            <div className="mt-2 space-y-2 text-sm">
              <div>
                <span className="font-semibold">Name: </span>
                {seller.business_name || "—"}
              </div>
              <div>
                <span className="font-semibold">Type: </span>
                {seller.business_type || "—"}
              </div>
              <div>
                <span className="font-semibold">Address: </span>
                {seller.business_address || "—"}
              </div>
              <div>
                <span className="font-semibold">Description: </span>
                {seller.business_description || "—"}
              </div>
            </div>
          </div>

          <div>
            <Typography variant="h6" color="blue-gray">
              Owner Information
            </Typography>
            <div className="mt-2 space-y-2 text-sm">
              <div>
                <span className="font-semibold">Owner: </span>
                {seller.first_name} {seller.last_name}
              </div>
              <div>
                <span className="font-semibold">Email: </span>
                {seller.email}
              </div>
              <div>
                <span className="font-semibold">Phone: </span>
                {seller.phone}
              </div>
              <div>
                <span className="font-semibold">Status: </span>
                <Chip
                  value={seller.is_active ? "Active" : "Inactive"}
                  color={seller.is_active ? "green" : "blue-gray"}
                  size="sm"
                />
              </div>
              <div>
                <span className="font-semibold">Applied At: </span>
                {seller.createdAt
                  ? new Date(seller.createdAt).toLocaleString()
                  : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Fruits Offered */}
        <div className="mt-6">
          <Typography variant="h6" color="blue-gray">
            Types of Fruits
          </Typography>
          {seller.types_of_fruits?.length ? (
            <ul className="list-disc list-inside ml-4 mt-2">
              {seller.types_of_fruits.map((fruit) => (
                <li
                  key={fruit._id || fruit.name}
                  className="flex items-center gap-3"
                >
                  <span>{fruit.name || fruit}</span>
                  {fruit.status !== undefined && (
                    <Chip
                      value={fruit.status === 1 ? "Available" : "Unavailable"}
                      color={fruit.status === 1 ? "green" : "red"}
                      size="sm"
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <Typography className="mt-2">No fruits listed</Typography>
          )}
        </div>

        {/* Certifications */}
        <div className="mt-6">
          <Typography variant="h6" color="blue-gray">
            Certifications
          </Typography>
          {seller.certifications?.length ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {seller.certifications.map((c, i) => (
                <Chip key={i} value={c} color="orange" size="sm" />
              ))}
            </div>
          ) : (
            <Typography className="mt-2">No certifications</Typography>
          )}
        </div>

        {/* Documents (images / pdfs, multiple) */}
        <div className="mt-6">
          <Typography variant="h6" color="blue-gray">
            Documents
          </Typography>

          {documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
              {documents.map((doc, idx) => {
                const ext = getExt(doc.filename || "");
                const isImage = isImageExt(ext);
                const isPdf = isPdfExt(ext);

                return (
                  <div
                    key={idx}
                    className="border rounded-lg p-3 flex flex-col justify-between bg-white"
                  >
                    <div className="flex-1">
                      {isImage ? (
                        <img
                          src={doc.url}
                          alt={doc.filename}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      ) : isPdf ? (
                        <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-md">
                          <div className="text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="h-10 w-10 mx-auto text-gray-600"
                            >
                              <path
                                fill="currentColor"
                                d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                              />
                            </svg>
                            <div className="mt-2 text-sm text-gray-700">
                              {doc.filename}
                            </div>
                            <div className="text-xs text-gray-500">
                              PDF document
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-md">
                          <div className="text-center">
                            <div className="text-sm text-gray-700">
                              {doc.filename}
                            </div>
                            <div className="text-xs text-gray-500">File</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline"
                      >
                        View
                      </a>

                      <a
                        href={doc.url}
                        download={doc.filename}
                        className="text-sm text-green-600"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Typography className="mt-2">No documents uploaded</Typography>
          )}
        </div>
      </DialogBody>

      <DialogFooter>
        <Button color="red" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

SellerDetails.propTypes = {
  seller: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default SellerDetails;
