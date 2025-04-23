class Storage {
  private fallbackStorage: Record<string, any> = {};
  private valid: boolean = checkStorage();

  getItem(key: string) {
    const value = this.valid ? localStorage.getItem(key) : this.fallbackStorage[key];
    if (!value) return null;

    try {
      return JSON.parse(value || "");
    } catch (error) {
      return value || null;
    }
  }

  setItem(key: string, value: any) {
    const stringified = typeof value === "string" ? value : JSON.stringify(value);

    if (this.valid) {
      localStorage.setItem(key, stringified);
      return;
    }

    this.fallbackStorage[key] = stringified;
  }

  removeItem(key: string) {
    if (this.valid) {
      localStorage.removeItem(key);
      return;
    }

    delete this.fallbackStorage[key];
  }
}

function checkStorage() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const storage = new Storage();

export { storage };
