import {
	getStorage,
	deleteObject,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

export const handleFile = (file, setFile, bool, files) => {
	if (!file) return;
	const fileName = new Date().getTime() + file.name;
	console.log(file);

	const storage = getStorage(app);
	const storageRef = ref(storage, fileName);

	const metadata = {
		contentType: "image/*",
	};
	const uploadTask = uploadBytesResumable(storageRef, file, metadata);

	// Listen for state changes, errors, and completion of the upload.
	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress =
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log("Upload is " + progress + "% done");
			switch (snapshot.state) {
				case "paused":
					alert("Upload is paused");
					break;
				case "running":
					console.log("Upload is running");
					break;
			}
		},
		(error) => {
			// A full list of error codes is available at
			// https://firebase.google.com/docs/storage/web/handle-errors
			switch (error.code) {
				case "storage/unauthorized":
					alert("User doesn't have permission to access the object");
					// User doesn't have permission to access the object
					break;
				case "storage/canceled":
					alert("User canceled the upload");
					// User canceled the upload
					break;

				// ...

				case "storage/unknown":
					alert("Unknown error occurred, inspect error.serverResponse");
					// Unknown error occurred, inspect error.serverResponse
					break;
			}
		},
		() => {
			// Upload completed successfully, now we can get the download URL
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				console.log("File available at", downloadURL);

				// console.log(downloadURL);
				if (bool) {
					console.log("i am here multiple files");
					setFile([...files, downloadURL]);
				} else {
					console.log("i am here single files");
					setFile(downloadURL);
				}
				console.log("Image Uploaded");
			});
		}
	);
	return false;
};

export const handleDelete = async (url, setfile, isMulImg, file) => {
	try {
		const storage = getStorage(app);
		const storageRef = ref(storage, url);
		await deleteObject(storageRef);
		if (isMulImg) {
			const filteredImg = file.filter((img) => img !== url);
			// console.log(filteredImg)
			setfile(filteredImg);
		} else {
			setfile("");
		}
	} catch (err) {
		console.log(err);
	}
};
